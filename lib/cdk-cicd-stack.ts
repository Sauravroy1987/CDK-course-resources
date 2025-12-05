import * as cdk from "aws-cdk-lib/core";
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
          "Sauravroy1987/CDK-course-resources", // Github Repository
          "cicd-practice" // Branch Name inside repository. Full root directory 'AWS_CDK_PROJECTS'
        ),
        commands: ["npm ci", "npx cdk synth"], // Commands to execute on code
        primaryOutputDirectory: "cdk-cicd/cdk.out",
      }),
    });
  }
}
