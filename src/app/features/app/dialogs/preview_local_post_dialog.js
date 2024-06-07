import React from 'react'

export default function PreviewLocalPostDialog({body}) {
    var data = body;
    const thumb = {
        // display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: "auto",
        height: "auto",
        padding: 4,
        boxSizing: 'border-box',
        textAlign: 'center'

    };
    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };
    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };
    return (


        <div style={thumb} key={data.file.name}>
            <div style={thumbInner}>
                {data.file.type.startsWith('image') ? (
                    <img src={data.file.preview} style={img} onLoad={() => URL.revokeObjectURL(data.file.preview)} alt="Preview" />
                ) : (
                    <video src={data.file.preview} style={img} controls />
                )}
            </div>
        </div>

    )
}
