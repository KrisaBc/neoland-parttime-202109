function includes(array, element) {
    for (var i = 0; i < array.length; i++) {
        var elementArray = array[i]
        if( elementArray === element){
            return true
            }    
    }
    return false
}