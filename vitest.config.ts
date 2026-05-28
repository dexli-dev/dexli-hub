// Engineer-domain vitest config — extends the scaffold's vite.config.ts to
// (a) discover the engineer `tests/` directory in addition to the in-src
// glob, and (b) globalSetup spawns the production adapter-node build so the
// headless smoke can walk live HTML inside vitest (bar item 10).

import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
	viteConfig,
	defineConfig({
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
			globalSetup: ['./tests/server-setup.ts'],
			testTimeout: 30000,
			hookTimeout: 30000
		}
	})
);
