import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
	UserPoolId: "us-east-1_6CX09fDNI",
	ClientId: "1623rnmaeq2n0mvgr1hth6bbls",
};

export default new CognitoUserPool(poolData);
