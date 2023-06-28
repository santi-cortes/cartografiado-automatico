import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export default async function handler(req, res) {
  const formidable = require('formidable');
    const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
          if (err) {
                res.status(500).json({ error: 'Error al procesar la carga del video.' });
                      return;
                          }

                              const { video, timeInterval } = files;
                                  const videoPath = video.path;
                                      const imagePathPattern = './public/images/frame-%d.png';
                                          const zipFilePath = './public/images.zip';

                                              try {
                                                    await processVideo(videoPath, imagePathPattern, timeInterval);

                                                          const zip = new AdmZip();
                                                                const imageFiles = fs.readdirSync('./public/images');

                                                                      imageFiles.forEach((file) => {
                                                                              const imagePath = path.join('./public/images', file);
                                                                                      zip.addLocalFile(imagePath);
                                                                                            });

                                                                                                  zip.writeZip(zipFilePath);

                                                                                                        const zipData = zip.toBuffer();

                                                                                                              // Elimina el archivo ZIP del servidor después de enviarlo como descarga
                                                                                                                    fs.unlinkSync(zipFilePath);

                                                                                                                          res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
                                                                                                                                res.setHeader('Content-Type', 'application/zip');
                                                                                                                                      res.setHeader('Content-Length', zipData.length);
                                                                                                                                            res.status(200).end(zipData);
                                                                                                                                                } catch (error) {
                                                                                                                                                      res.status(500).json({ error: 'Error al procesar el video.' });
                                                                                                                                                          }
                                                                                                                                                            });
                                                                                                                                                            }
                                                                                                                                                            