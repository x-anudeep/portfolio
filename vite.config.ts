import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    base: process.env.VITE_BASE_PATH || '/',
    // Worker-only imports must be ready before the first scene starts loading.
    optimizeDeps: {
        include: [
            'three/addons/loaders/FontLoader.js',
            'three/addons/geometries/TextGeometry.js',
            'three/addons/math/MeshSurfaceSampler.js',
            'three/addons/utils/BufferGeometryUtils.js',
        ],
    },
    plugins: [
        glsl({
            include: ['**/*.glsl', '**/*.vert', '**/*.frag'],
            defaultExtension: 'glsl',
            warnDuplicatedImports: true,
            minify: true,
        }),
    ],
    server: {
        host: true,
    },
    build: {
        sourcemap: false,
        rolldownOptions: {
            input: {
                main: 'index.html',
                privacy: 'privacy.html',
            },
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'three',
                            test: /node_modules[\\/](?:three|meshline)(?:[\\/]|$)/,
                            priority: 20,
                        },
                    ],
                },
            },
        },
    },
});
