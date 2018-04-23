#addin "nuget:?package=Cake.Yarn&version=0.3.6"
#addin "nuget:?package=Cake.Docker&version=0.8.3"

#load "yarn-actions.cake";

string dockerImageReference = "akella/metadata-ui";

Task("Default")
    .IsDependentOn("YarnInstall")
    .IsDependentOn("YarnBuild")
    .IsDependentOn("YarnTests")
    .IsDependentOn("DockerBuild")
    .IsDependentOn("DockerLogin")
    .IsDependentOn("DockerPush");

Task("YarnInstall")
    .Does(YarnInstall());

Task("YarnBuild")
    .Does(YarnRunScript("build"));

Task("YarnTests")
    .Does(YarnRunScript("test:coverage"));

Task("DockerLogin")
    .Does(() =>
{
    DockerLogin("akella","keldr362mykola","docker.io");
});

Task("DockerBuild")
    .Does(() =>
{
    DockerBuild(
        new DockerImageBuildSettings(){
            Tag = new []{$"{dockerImageReference}:latest",$"{dockerImageReference}:1"}
        }, "../");
});

Task("DockerPush")
    .Does(() =>
{
    DockerPush($"{dockerImageReference}");
});

RunTarget("Default");