"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementifyClient = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
class AchievementifyClient {
    constructor(options) {
        this.redirectPath = '/auth/redirect/achievementify';
        this.callbackPath = '/auth/callback/achievementify';
        if (!options.projectId) {
            throw new Error('Project ID is not set');
        }
        this.projectId = options.projectId;
        if (!options.clientSecret) {
            throw new Error('Client secret is not set');
        }
        this.clientSecret = options.clientSecret;
        this.clientUrl = options.debug ? constants_1.CLIENT_URL_DEBUG : constants_1.CLIENT_URL;
        this.api = axios_1.default.create({
            baseURL: options.debug ? constants_1.API_SERVER_DEBUG : constants_1.API_SERVER,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (options.redirectPath) {
            this.redirectPath = options.redirectPath;
        }
        if (options.callbackPath) {
            this.callbackPath = options.callbackPath;
        }
    }
    getRedirectPath() {
        return this.redirectPath;
    }
    getCallbackPath() {
        return this.callbackPath;
    }
    generateState() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 32; i > 0; i -= 1) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }
    generateConnectLink(options) {
        return `${this.clientUrl}/oauth?project_id=${this.projectId}&user_id=${options.userId}&redirect_uri=${options.rootUrl}${this.callbackPath}&state=${options.state}`;
    }
    connect(options) {
        const { authorizationCode, userId } = options;
        return this.api.post('/oauth', {
            clientSecret: this.clientSecret,
            authorizationCode,
            projectId: this.projectId,
            thirdPartyUserId: userId,
        });
    }
    send(options) {
        const { userId, achievementId } = options;
        return this.api.post(`/achievements/${achievementId}`, {
            userId,
            clientSecret: this.clientSecret,
        });
    }
}
exports.AchievementifyClient = AchievementifyClient;
