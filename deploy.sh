echo "Do you want to update the image with the new source code? (y/n)"
read answer

if [ "$answer" = "y" ]; then
  echo "Updating the image..."
  git pull
  docker build --no-cache -t mybookmarks -f Dockerfile .
  docker-compose up -d --force-recreate
else
  echo "The image will not be updated."
fi

