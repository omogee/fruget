const cloudinary = require ("cloudinary")

cloudinary.config({
    cloud_name:"fruget-com",
    api_key: "614738379773118",
    api_secret: "fCkcfwZsVDrvCNt6d_fMrG2i4NM"
})

exports.uploads = (file, folder) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
}
  
 