FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
  })
  FilePond.parse(document.body);


  /*C:\Users\pooja\Desktop\code-shh\javascript\simple_nodejs_\books_app\public\javascripts\fileUpload.js
This registers the plugins you'll use with FilePond. Plugins extend the functionality of FilePond, enabling things like image previews, resizing, 
and file encoding.
FilePondPluginImagePreview: Adds a preview of the uploaded image before it's submitted, allowing users to see what they uploaded.
FilePondPluginImageResize: Resizes the uploaded image to a specific target width and height.
FilePondPluginFileEncode: Encodes the file (e.g., an image) as a Base64 string, making it easier to send the file data to the server as text.


Purpose: This sets the global options for all FilePond instances on the page.

stylePanelAspectRatio: 150 / 100: Defines the aspect ratio of the file upload panel. In this case, it's 1.5 (150:100), meaning the upload box will be taller than it is wide.
imageResizeTargetWidth: 100: Sets the target width (in pixels) for resizing the uploaded image to 100 pixels wide.
imageResizeTargetHeight: 150: Sets the target height (in pixels) for resizing the uploaded image to 150 pixels tall.

*/