import { useState } from 'react';

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
    const [timeInterval, setTimeInterval] = useState(1);
      const [downloadLink, setDownloadLink] = useState(null);

        const handleVideoChange = (event) => {
            setSelectedVideo(event.target.files[0]);
              };

                const handleTimeIntervalChange = (event) => {
                    setTimeInterval(parseInt(event.target.value));
                      };

                        const handleUpload = async () => {
                            const formData = new FormData();
                                formData.append('video', selectedVideo);
                                    formData.append('timeInterval', timeInterval);

                                        const response = await fetch('/api/upload', {
                                              method: 'POST',
                                                    body: formData,
                                                        });

                                                            if (response.ok) {
                                                                  const blob = await response.blob();
                                                                        const url = URL.createObjectURL(blob);
                                                                              setDownloadLink(url);
                                                                                  } else {
                                                                                        // Manejo de errores
                                                                                            }
                                                                                              };

                                                                                                return (
                                                                                                    <div>
                                                                                                          <input type="file" accept="video/*" onChange={handleVideoChange} />
                                                                                                                <select value={timeInterval} onChange={handleTimeIntervalChange}>
                                                                                                                        <option value={1}>1 segundo</option>
                                                                                                                                <option value={2}>2 segundos</option>
                                                                                                                                        <option value={5}>5 segundos</option>
                                                                                                                                              </select>
                                                                                                                                                    <button onClick={handleUpload}>Subir</button>
                                                                                                                                                          {downloadLink && (
                                                                                                                                                                  <div>
                                                                                                                                                                            <a href={downloadLink} download="images.zip">
                                                                                                                                                                                        Descargar ZIP
                                                                                                                                                                                                  </a>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                )}
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                      );
                                                                                                                                                                                                                      };

                                                                                                                                                                                                                      export default VideoUploader;
                                                                                                                                                                                                                      