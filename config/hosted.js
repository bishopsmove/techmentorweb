module.exports = {

    // Commpiler configuration
    configuration: "release",
    selfHost: false,

    // Common configuration
    environment: "#{Environment.Name}",
    version: "#{Release.Number}",
    apiUri: "#{Api.Uri}",

    // Client configuration
    authAudience: "#{Api.Uri}",
    authClientId: "#{Auth.ClientId}",
    
    // Server configuration
    port: 443,
};