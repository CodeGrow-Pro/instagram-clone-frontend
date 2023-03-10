const imageMaker = (BufferImage)=>{
    var base64String = "";
    if (BufferImage) {
      base64String = btoa(
        String.fromCharCode(...new Uint8Array(BufferImage.data))
      );
    }
    return base64String;
}
export default imageMaker;