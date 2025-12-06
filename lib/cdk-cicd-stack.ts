import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { PipelineStage } from "./PipelineStage";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "PracticePipeline", {
      pipelineName: "PracticePipeline",

      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          "Sauravroy1987/CDK-course-resources", // GitHub repo
          "cicd-practice", // Branch name
          {
            // codepipeline will use github-token secret to authenticate and connect github
            // github-token has GITHUB token secret
            authentication: cdk.SecretValue.secretsManager("github-token"),
          }
        ),

        commands: [
          "npm ci",
          "npm run build", // recommended if you use TypeScript
          "npx cdk synth",
        ],

        primaryOutputDirectory: "cdk.out",
      }),
    });
    // Add Stage to PipeLine
    pipeline.addStage(
      new PipelineStage(this, "PipeLineTestStage", {
        stageName: "Test",
      })
    );
  }
}
