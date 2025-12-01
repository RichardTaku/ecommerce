<?php
session_start();
if (!isset($_SESSION['admin_logged_in'])) {
  header('Location: admin_login.php');
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
  $targetDir = "assets/products/";
  $targetFile = $targetDir . basename($_FILES["image"]["name"]);
  move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile);
  echo "Image uploaded successfully.";
}
?>
<form method="POST" enctype="multipart/form-data">
  <input type="file" name="image" required>
  <button type="submit">Upload Image</button>
</form>