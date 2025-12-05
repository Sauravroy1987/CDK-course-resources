import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

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
  }
}
