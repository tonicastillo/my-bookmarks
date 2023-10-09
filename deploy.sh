echo "¿Quieres actualizar la imagen con el nuevo código fuente? (s/n)"
read respuesta

if [ "$respuesta" = "s" ] || [ "$respuesta" = "y" ]; then
  echo "Actualizando la imagen..."
  git pull
  docker build -t mybookmarks -f Dockerfile .
  docker run -p 4001:4321 mybookmarks
else
  echo "No se actualizará la imagen."
fi

