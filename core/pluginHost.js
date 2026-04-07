import { createPluginAPI } from "./pluginAPI.js";

export class PluginHost {
  constructor(app) {
    this.app = app;
    this.plugins = [];
    this.api = createPluginAPI(app);
  }

  async loadPlugins(manifestUrl) {
    try {
      const res = await fetch(manifestUrl);
      const manifest = await res.json();

      for (const pluginMeta of manifest) {
        if (!pluginMeta.enabled) continue;

        try {
          const module = await import(pluginMeta.url);
          const plugin = module.default;

          if (!plugin.id || !plugin.setup || !plugin.draw) {
            console.warn(`Invalid plugin: ${pluginMeta.id}`);
            continue;
          }

          plugin.setup(this.api);
          this.plugins.push(plugin);

          console.log(`Loaded plugin: ${plugin.id}`);
        } catch (err) {
          console.error(`Failed to load plugin ${pluginMeta.id}`, err);
        }
      }
    } catch (err) {
      console.error("Failed to load plugin manifest", err);
    }
  }

  runDraw() {
    for (const plugin of this.plugins) {
      try {
        plugin.draw(this.api);
      } catch (err) {
        console.error(`Plugin draw error (${plugin.id})`, err);
      }
    }
  }

  destroyAll() {
    for (const plugin of this.plugins) {
      try {
        plugin.destroy?.(this.api);
      } catch (err) {
        console.error(`Plugin destroy error (${plugin.id})`, err);
      }
    }
  }
}