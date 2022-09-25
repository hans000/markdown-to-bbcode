import { Config } from "../typing";
import ConfigExtension from "./config";
import BBSCodeExtension from "./bbscode";
import RegionExtension from "./region";
import ContentExtension from "./content";
import { marked } from "marked";
import EnterExtension from "./enter";

export function getDefaultConfig(): Config {
    return {
        h1: { size: 7, bold: true },
        h2: { size: 6, bold: true },
        h3: { size: 5, bold: true },
        h4: { size: 4, bold: true },
        h5: { size: 3, bold: true },
        h6: { size: 2, bold: true },
    }
}

export class GlobalConfig {
    private static configStack = [getDefaultConfig()]

    public static get config() {
        return GlobalConfig.configStack.at(-1) || {}
    }

    public static push(patch?: Config) {
        const { password, postbg, ...restConfig } = GlobalConfig.config
        GlobalConfig.configStack.push(Object.assign(restConfig, patch))
        return GlobalConfig.config
    }

    public static pop() {
        GlobalConfig.configStack.pop()
    }

    public static clear() {
        GlobalConfig.configStack.length = 1
    }
}

export default class ExtManager {
    public static run() {
        BBSCodeExtension.run()
        ConfigExtension.run()
        RegionExtension.run()
        ContentExtension.run()
        EnterExtension.run()
    }

    public static reset() {
        GlobalConfig.clear()
        ContentExtension.reset()
    }

    public static parse(raw: string) {
        ExtManager.reset()
        const main = marked.parse(raw)
        const content = ContentExtension.getContent()
        return content + main.replace(/\s*⇜/g, '').replace(/⏎/g, '\n')
    }
}