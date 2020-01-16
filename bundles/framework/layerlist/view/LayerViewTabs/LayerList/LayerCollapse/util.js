import { LayerURLForm } from "../../../../../../admin/admin-layereditor/view/LayerWizard/LayerURLForm";

/**
 * If both layers have same group, they are ordered by layer.getName()
 * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer/Object} a comparable layer 1
 * @param {Oskari.mapframework.domain.WmsLayer/Oskari.mapframework.domain.WfsLayer/Oskari.mapframework.domain.VectorLayer/Object} b comparable layer 2
 * @param {String} method layer method name to sort by
 */
const comparator = (a, b, method) => {
    var nameA = a[method]().toLowerCase();
    var nameB = b[method]().toLowerCase();
    if (nameA === nameB && (a.getName() && b.getName())) {
        nameA = a.getName().toLowerCase();
        nameB = b.getName().toLowerCase();
    }
    return Oskari.util.naturalSort(nameA, nameB);
};

/**
 * @param {Oskari.mapframework.domain.AbstractLayer[]} layers layers to group
 * @param {String} method layer method name to sort by
 */
export const groupLayers = (layers, method, tools) => {
    const groupList = [];
    let group = null;

    // sort layers by grouping & name
    layers.sort((a, b) => comparator(a, b, method))
        .filter(layer => !layer.getMetaType || layer.getMetaType() !== 'published')
        .forEach(layer => {
            const groupAttr = layer[method]();

            let groupId;
            if (method === 'getInspireName') {
                groupId = layer._groups[0] ? layer._groups[0].id : undefined;
            } else {
                // Layers without organization are not visible in layerlist when grouped by dataprovider
                groupId = layer.admin ? layer.admin.organizationId : -1;
            }

            if (!group || group.getTitle() !== groupAttr) {
                group = Oskari.clazz.create(
                    'Oskari.mapframework.bundle.layerselector2.model.LayerGroup',
                    groupId, method, groupAttr
                );
                groupList.push(group);
            }
            group.addLayer(layer);
            group.setTools(tools);
        });

    return groupList;
};
