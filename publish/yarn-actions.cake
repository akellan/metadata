Action YarnInstall(){
    return () => {
        Yarn.Install();
    };
}

Action YarnRunScript(string script){
    return () => {
        Yarn.RunScript(script);
    };
}