// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	components: [
		{
			path: "~/components",
			pathPrefix: false
		}
	],
	css: [
		"@fortawesome/fontawesome-svg-core/styles.css"
	],
	imports: {
		dirs: [
			"composables/**"
		]
	},
	ionic: {
		css: {
			utilities: true
		}
	},
	lodash: {
		prefix: "_",
		upperAfterPrefix: false
	},
	modules: ["@nuxtjs/ionic", "@vee-validate/nuxt", "nuxt-lodash"],
	pages: true,
	srcDir: "src",
	typescript: {
		typeCheck: "build",
		shim:false
	},
})
