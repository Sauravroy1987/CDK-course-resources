import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
  Tracing,
} from "aws-cdk-lib/aws-lambda";
import { join } from "path";

// Properties for Stage Name
interface LambdaStackProps extends StackProps {
  stageName: string;
}

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, "HelloLambda", {
      runtime: Runtime.NODEJS_20_X,
      handler: "hello.handler", // handler function name
      code: Code.fromAsset(join(__dirname, "..", "services")), // Find /services/hello.js file
      // Set the table name as environment variable
      environment: {
        STAGE: props.stageName,
      },
      // Enable X-Ray for tracing lambda execution
      tracing: Tracing.ACTIVE,
      // Set lambda excution timeout duration to 1min. Default 3secs.
      timeout: Duration.minutes(1),
    });
  }
}
