"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementifyClient = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("./constants");
class AchievementifyClient {
    constructor(clientSecret, debug) {
        if (!clientSecret) {
            throw new Error('Client secret is not set');
        }
        this.clientSecret = clientSecret;
        this.api = axios_1.default.create({
            baseURL: debug ? constants_1.API_SERVER_DEBUG : constants_1.API_SERVER,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    trigger(options) {
        const { userId, achievementId } = options;
        return this.api.post(`/achievements/${achievementId}`, {
            userId,
            clientSecret: this.clientSecret,
        });
    }
}
exports.AchievementifyClient = AchievementifyClient;
