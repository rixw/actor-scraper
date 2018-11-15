(function (global) {
    /**
     * Takes a configuration object with function references
     * as an input and creates a dummy class that proxies
     * function invocations from Browser context to Node context.
     *
     * The configuration is to be provided by the
     * tools.createBrowserHandlesForObject function.
     */
    class NodeProxy {
        constructor(config) {
            if (!config || typeof config !== 'object') {
                throw new Error('NodeProxy: Parameter config of type Object must be provided.');
            }

            Object.entries(config)
                .forEach(([key, value]) => {
                    this[key] = (...args) => global[value](...args);
                });
        }
    }

    /**
     * Exposed factory.
     * @param config
     * @return {NodeProxy}
     */
    global.Apify.createNodeProxy = config => new NodeProxy(config);
}(window));