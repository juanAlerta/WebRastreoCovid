<?php
    include_once "conexion.php";
    header('Content-Type: text/txt; charset=utf-8');

    class Evento{

        public function contarEventos(){
            $conexion = (new Conexion())->conectar();
            $sql = "SELECT COUNT(*) AS Cantidad FROM `evento`";
            $pdo = $conexion->prepare($sql);
            $pdo->execute();
            
            $json = array();

            while ($row=$pdo->fetch(PDO::FETCH_ASSOC)){
                $json[] = array('eventos' => $row['Cantidad']);
            }
                echo json_encode($json[0]['eventos']);
        }
    }

    ($evento = new Evento())->contarEventos();

?>