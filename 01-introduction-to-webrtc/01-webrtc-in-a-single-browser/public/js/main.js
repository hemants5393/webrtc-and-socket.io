// Variables declaration
const videoSelect = document.querySelector("#camera");
const audioInputSelect = document.querySelector("select#audioSource");
const videoArea = document.querySelector("video");
const errorElement = document.querySelector("#errorMsg");
const takePicButton = document.querySelector("#takePicButton");
const profilePicCanvas = document.querySelector("#profilePicCanvas");
const profilePicOutput = document.querySelector("#profilePicOutput");
let width = 320; // We will scale the photo width to this
let height = 0; // This will be computed based on the input stream
let streaming = false; // Indicates whether or not we're currently streaming

// Fetch the media devices (cameras, audio devices etc..)
getMediaDevices();

// Pass "startStream" as callback when the dropdown select is changed for audio or video
videoSelect.onchange = startStream;
audioInputSelect.onchange = startStream;

// Initiate streaming
startStream();

async function getMediaDevices() {
  try {
    const deviceInfos = await navigator.mediaDevices.enumerateDevices();
    if (deviceInfos) {
      gotDevices(deviceInfos);
    }
  } catch (error) {
    handleDevicesError(error);
  }
}

function gotDevices(deviceInfos) {
  for (let i = 0; i !== deviceInfos.length; ++i) {
    const deviceInfo = deviceInfos[i];
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "videoinput") {
      // Append available cameras to the video dropdown list
      console.info("Found video output device: ", deviceInfo.label);
      option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else if (deviceInfo.kind === "audioinput") {
      // Append available audio input devices to the audio dropdown list
      option.text =
        deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
      audioInputSelect.appendChild(option);
    } else {
      console.log("Found non video output device: ", deviceInfo.label);
    }
  }
}

function handleDevicesError(error) {
  console.log(
    "navigator.MediaDevices.getUserMedia error: ",
    error.message,
    error.name
  );
}

async function startStream() {
  try {
    const videoSource = videoSelect.value;
    const audioSource = audioInputSelect.value;
    const constraints = {
      audio: {
        deviceId: audioSource ? { exact: audioSource } : undefined,
      },
      video: {
        deviceId: videoSource ? { exact: videoSource } : undefined,
        minWidth: 640,
        maxWidth: 640,
        minHeight: 360,
        maxHeight: 480,
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream, constraints);
  } catch (error) {
    handleError(error);
  }
}

function handleSuccess(stream, constraints) {
  const videoTracks = stream.getVideoTracks();
  console.log("Success!, Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  videoArea.srcObject = stream;
  // videoArea.className = "grayscale_filter";
  videoArea.play();
}

function handleError(error) {
  if (error.name === "ConstraintNotSatisfiedError") {
    const v = constraints.video;
    errorMsg(
      `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
    );
  } else if (error.name === "PermissionDeniedError") {
    errorMsg(
      "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the app to work."
    );
  }
  errorMsg(`Error with getUserMedia: ${error.name}`, error);
}

function errorMsg(msg, error) {
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

/* Profile pic capture functionality starts here. */
takePicButton.addEventListener(
  "click",
  function (ev) {
    takeProfilePic();
    ev.preventDefault();
  },
  false
);

clearPicButton.addEventListener("click", clearphoto, false);

// Run it at startup to create the picture output box
clearphoto();

// Fill the photo with an indication that none has been captured.
function clearphoto() {
  var context = profilePicCanvas.getContext("2d");
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, profilePicCanvas.width, profilePicCanvas.height);

  var data = profilePicCanvas.toDataURL("image/png");
  profilePicOutput.setAttribute("src", data);
}

// Capture a photo by fetching the current contents of the video
// and drawing it into a canvas, then converting that to a PNG
// format data URL. By drawing it on an offscreen canvas and then
// drawing that to the screen, we can change its size and/or apply
// other changes before drawing it.
function takeProfilePic() {
  var context = profilePicCanvas.getContext("2d");
  if (width && height) {
    profilePicCanvas.width = width;
    profilePicCanvas.height = height;
    context.drawImage(videoArea, 0, 0, width, height);

    var data = profilePicCanvas.toDataURL("image/png");
    profilePicOutput.setAttribute("src", data);
  } else {
    clearphoto();
  }
}

// To calculate the width and height only once
videoArea.addEventListener(
  "canplay",
  function (ev) {
    if (!streaming) {
      height = videoArea.videoHeight / (videoArea.videoWidth / width);

      // Firefox currently has a bug where the height can't be read from
      // the video, so we will make assumptions if this happens.

      if (isNaN(height)) {
        height = width / (4 / 3);
      }

      videoArea.setAttribute("width", width);
      videoArea.setAttribute("height", height);
      profilePicCanvas.setAttribute("width", width);
      profilePicCanvas.setAttribute("height", height);
      streaming = true;
    }
  },
  false
);
/* Profile pic capture functionality ends here. */
