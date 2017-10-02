const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) 
{
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess(config, env, {
        modifyVars: {
            "@primary-color" : "#F04134",
            "@border-radius-base" : "0",
            "@border-radius-sm" : "0"
        },
    });
    return config; 
};