let materialID = window.localStorage.getItem('materialID');
materialID = materialID || null;

function setMaterialID(materialId) {
    materialID = materialId;
    window.localStorage.setItem('materialID', materialID);
}
function getMaterialID() {
    return materialID;
}

export { setMaterialID, getMaterialID };
