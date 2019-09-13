module.exports = {
    'defaultVerify': (path, fs, splash) => {
        //Storage
        if(fs.existsSync(path)){
            if(fs.existsSync(`${path}/data`)){
                if(fs.existsSync(`${path}/data/settings.json`)){   
                    //Replace splash with changelog screen
                    //show splash after done this
                    if(fs.existsSync(`${path}/data/version.json`)){
                        splash.setSize(500,400);
                        splash.loadFile('assets/views/change.html');
                    }else{
                        //If file not exists dont trigger changelog and just destroy the splashscreen
                        splash.destroy();
                    }
                }else{
                    fs.writeFileSync(`${path}/data/settings.json`,JSON.stringify({files:`${path}`, enablePatch:'true'}));
                }
            }else{
                fs.mkdirSync(`${path}/data`);
                fs.writeFileSync(`${path}/data/settings.json`,JSON.stringify({files:`${path}`, enablePatch:'true'}));
                splash.destroy();
            }
            if(!fs.existsSync(`${path}/files`)){
                fs.mkdirSync(`${path}/files`);
            }
        }else{
            fs.mkdirSync(path);
            fs.mkdirSync(`${path}/files`);
            fs.mkdirSync(`${path}/data`);
            fs.writeFileSync(`${path}/data/settings.json`,JSON.stringify({files:`${path}`, enablePatch:'true'}));
            splash.destroy();
        }
    },
    'getHomepath': (platform, projName, OSname, homedir) => {
        let path = "";
        switch(platform){
            case 'win32':
                path = `C:/Users/${OSname}/Documents/${projName}`;
            break;
            case 'linux':
                path = `${homedir}/${projName}`;
            break;
        }
        return path;
    },
    'getSettings': (fs, path) => {
        let settings
        if(fs.existsSync(`${path}/data/settings.json`)){   
            settings = JSON.parse(fs.readFileSync(`${path}/data/settings.json`, "utf8"));
        }else{
            settings = {
                "enablePatch":"true"
            };
        }
        return settings;
    }
};