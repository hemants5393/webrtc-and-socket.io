// Variables declaration
const videoSelect = document.querySelector("#camera");
const audioInputSelect = document.querySelector("select#audioSource");
const videoArea = document.querySelector("video");
const errorElement = document.querySelector("#errorMsg");

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
