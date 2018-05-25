/**
 * This component manage the different year/regionset combinations listing for indicator data.
 * Also asks for selector values/regionset when user adds another dataset (selector combination for indicator)
 */
Oskari.clazz.define('Oskari.statistics.statsgrid.IndicatorParametersList', function (locale) {
    this.locale = locale;
    this.element = null;
    this.addDatasetButton = null;
    this.availableRegionsets = [];
    // this.regionselect = Oskari.clazz.create('Oskari.statistics.statsgrid.RegionsetSelector', service, locale);
    this.createUi();
    Oskari.makeObservable(this);
}, {
    __templates: {
        main: _.template('<div class="user-indicator-main"><ul></ul><div class="new-indicator-dataset-params"><div class="util-row"></div></div></div>'),
        listItem: _.template('<li>${year} - ${regionset}</li>'),
        form: '<form class="indicator-selectors-form" style="width: 25%"></form>',
        input: _.template('<input type="text" style="width: 80%" name="${name}" placeholder="${label}"><br />')
    },
    getElement: function () {
        return this.element;
    },
    createUi: function () {
        if (this.getElement()) {
            return this.getElement();
        }
        var me = this;

        var main = jQuery(this.__templates.main());
        this.element = main;

        var indBtn = Oskari.clazz.create('Oskari.userinterface.component.Button');
        indBtn.setTitle(this.locale('userIndicators.buttonAddIndicator'));
        indBtn.insertTo(main);
        this.addDatasetButton = indBtn;

        indBtn.setHandler(function (event) {
            event.stopPropagation();
            me.requestIndicatorSelectors();
        });
        return this.getElement();
    },
    setDatasets: function (datasets) {
        var me = this;
        var listEl = this.getElement().find('ul');
        listEl.empty();
        if (!datasets) {
            return;
        }
        datasets.forEach(function (dataset) {
            // TODO: formatting/nice UI
            var item = me.__templates.listItem({
                year: me.locale('parameters.year') + ' ' + dataset.year,
                regionset: me.getRegionsetName(dataset.regionset)
            });
            // TODO: add edit/delete links
            /* for edit:
            me.trigger('insert.data', {
                year: dataset.year,
                regionset: dataset.regionset
            });
            for delete:
            me.trigger('delete.data', {
                year: dataset.year,
                regionset: dataset.regionset
            });
            */
            listEl.append(item);
        })
    },
    setRegionsets: function (availableRegionsets) {
        this.availableRegionsets = availableRegionsets;
    },
    getRegionsetName: function (id) {
        var regionset = this.availableRegionsets.find(function (regionset) {
            return regionset.id === id;
        });
        if (regionset) {
            return regionset.name;
        }
        return id;
    },
    resetIndicatorSelectors: function (showInsertButton) {
        var formContainer = this.getElement().find('.new-indicator-dataset-params');
        formContainer.empty();
        this.addDatasetButton.setVisible(showInsertButton);
        return formContainer;
    },
    requestIndicatorSelectors: function () {
        var form = jQuery(this.__templates.form);
        // TODO: year etc as params
        var input = jQuery(this.__templates.input({
            name: 'year',
            label: this.locale('parameters.year')
        }));
        form.append(input);
        var formContainer = this.resetIndicatorSelectors(false);
        formContainer.append(form);
        // focus on the year input
        input.focus();

        // create regionset selection
        var regionsetContainer = jQuery('<div></div>');
        regionsetContainer.append(this.locale('panels.newSearch.selectRegionsetPlaceholder'));
        var select = Oskari.clazz.create('Oskari.userinterface.component.SelectList');
        regionsetContainer.append(select.create(this.availableRegionsets, {
            allow_single_deselect: false,
            placeholder_text: this.locale('panels.newSearch.selectRegionsetPlaceholder'),
            width: '100%'
        }));
        select.selectFirstValue();
        select.adjustChosen();

        formContainer.append(regionsetContainer);

        // create buttons
        var btnContainer = jQuery('<div style="display:flex"></div>');
        formContainer.append(btnContainer);

        var me = this;
        var cancelBtn = Oskari.clazz.create('Oskari.userinterface.component.buttons.CancelButton');
        cancelBtn.insertTo(btnContainer);
        cancelBtn.setHandler(function (event) {
            me.resetIndicatorSelectors(true);
        });
        var showTableBtn = Oskari.clazz.create('Oskari.userinterface.component.buttons.AddButton');
        showTableBtn.insertTo(btnContainer);
        showTableBtn.setHandler(function (event) {
            me.resetIndicatorSelectors(true);
            me.trigger('insert.data', {
                year: input.val(),
                regionset: Number(select.getValue())
            });
        });
    }
});
