module.exports = function(config) {

    config.node('bundles/index', function(nodeConfig) {
        nodeConfig.addTechs([
            [ require('enb/techs/levels'), { levels: getLevels() } ],
            [ require('enb/techs/file-provider'), { target: '?.bemdecl.js' } ],
            [ require('enb-modules/techs/deps-with-modules') ],
            require('enb/techs/files'),

            require('enb-stylus/techs/css-stylus'),
            [ require('enb-borschik/techs/borschik'), { sourceTarget: '?.css', destTarget: '_?.css', minify: false, freeze: true } ],

            require('enb-diverse-js/techs/browser-js'),
            [ require('enb-modules/techs/prepend-modules'), { source: '?.browser.js', target: '?.js' } ],
            [ require('enb-borschik/techs/borschik'), { sourceTarget: '?.js', destTarget: '_?.js', minify: false } ],

            [ require('enb-bemxjst/techs/bemtree'), { devMode: true } ],
            [ require('enb-bemxjst/techs/bemhtml'), { devMode: true } ],
            [ require('enb-diverse-js/techs/node-js'), { target: '?.pre.node.js' } ],
            [ require('enb-modules/techs/prepend-modules'), { source: '?.pre.node.js', target: '?.node.js' } ]
        ]);
        nodeConfig.addTargets(['_?.css', '_?.js', '?.bemhtml.js', '?.node.js', '?.bemtree.js']);

        function getLevels() {
            return [
                { path: 'libs/bem-core/common.blocks', check: false },
                { path: 'libs/bem-core/desktop.blocks', check: false },
                { path: 'libs/bem-components/common.blocks', check: false },
                { path: 'libs/bem-components/desktop.blocks', check: false },
                { path: 'libs/bem-components/design/common.blocks', check: false },
                { path: 'libs/bem-components/design/desktop.blocks', check: false },
                { path: 'blocks', check: true }
            ].map(function(l) { return config.resolvePath(l); });
        }
    });

};
