
//usage <div style={show(true)} />
export function show(condition) {
    return condition ? {} : {display: 'none'};
}

//usage <div {...showStyle(true)} />
export function showStyle(condition){
    return {style: show(condition)};
}
