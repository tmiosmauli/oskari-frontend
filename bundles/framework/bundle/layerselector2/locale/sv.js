Oskari.registerLocalization({
	"lang" : "sv",
	"key" : "LayerSelector",
	"value" : {
		"title" : "Kartlager",
		"desc" : "",
		"errors" : {
			"loadFailed" : "Fel i laddningen av kartlager. Ladda ned sidan på nytt i din läsare och välj kartlagren."
		},
		"filter" : {
			"text" : "Sök kartlager",
			"inspire" : "Enligt tema",
			"organization" : "Enligt dataproducent",
			"published" : "Användare"
		},
		"tooltip" : {
			"type-base" : "Bakgrundskarta",
			"type-wms" : "kartlager",
			"type-wfs" : "Dataprodukt"
		},
		"backendStatus" : {
			"DOWN" : {
				"tooltip" : "??? Karttataso ei ole saatavilla tällä hetkellä.",
				"iconClass" : "backendstatus-down"
			},
			"MAINTENANCE" : {
				"tooltip" : "??? Karttatason saatavuudessa on tiedossa käyttökatkoja lähipäivinä.",
				"iconClass" : "backendstatus-maintenance"
			}
		}
	}
});
