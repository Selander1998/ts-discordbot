import i18next from "i18next";
import FsBackend, { FsBackendOptions } from "i18next-fs-backend";

i18next.use(FsBackend).init<FsBackendOptions>({
	fallbackLng: "en",
	lng: "en",
	ns: "backend-app",
	defaultNS: "backend-app",
	backend: {
		loadPath: "src/locales/{{lng}}/{{ns}}.json",
	},
});

export default i18next;
