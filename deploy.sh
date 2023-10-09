echo "Do you want to update the image with the new source code? (y/n)"
read answer

if [ "$answer" = "y" ]; then
  echo "Updating the image..."
  git pull
  docker build -t mybookmarks -f Dockerfile .
  docker-compose up -d
else
  echo "The image will not be updated."
fi

