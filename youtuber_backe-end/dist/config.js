"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = 3000;
const baseUrl = `http://localhost:${port}`;
const keys = require("./kyes");
exports.default = {
    JTWSecret: "mySecrtt",
    baseUrl: baseUrl,
    port: port,
    oauth2Credentials: {
        clinteId: keys.web.client_id,
        projectId: keys.web.project_id,
        authUri: keys.web.auth_uri,
        tockenUri: keys.web.token_uri,
        auth_provider_x509_cert_url: keys.web.auth_provider_x509_cert_url,
        client_secret: keys.web.client_secret,
        redirect_uris: [keys.web.redirect_uris[0]],
        scopes: [
            "https://www.googleapis.com/auth/youtube.readonly",
            "https://www.googleapis.com/auth/youtube.force-ssl ",
        ],
    },
};
//# sourceMappingURL=config.js.map