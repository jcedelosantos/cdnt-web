import { defineRailway, github, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "web";
export default defineRailway(() => {
  const web = service("web", {
    source: github("jcedelosantos/cdnt-web", { branch: "main", checkSuites: false, rootDirectory: "/cedanet_solutions/nextjs_space" }),
    build: { buildCommand: "npm run build", buildEnvironment: "V3", builder: "RAILPACK" },
    start: "npm start",
    healthcheck: "/",
    healthcheckTimeout: 120,
    deploy: { restartPolicyType: "ON_FAILURE" },
    replicas: { "sfo": 1 },
    domains: ["www.cedanet.net"],
  });

  return project("cedanet-web", {
    variables: { managed: false },
    resources: [web],
  });
});
