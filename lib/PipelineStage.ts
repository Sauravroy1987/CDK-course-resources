import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";

export interface PipelineStageProps extends StageProps {
  stageName: string;
}

// Stage under pipeline
// Stage contains other Stacks
export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: PipelineStageProps) {
    super(scope, id, props);

    // Create Lambda Stack under Stage
    const lambdaStack = new LambdaStack(this, "LambdaStack", {
      stageName: props.stageName,
    });
  }
}
