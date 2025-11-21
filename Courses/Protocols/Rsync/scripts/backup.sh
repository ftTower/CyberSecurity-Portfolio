#!/bin/bash

# Configuration de la cible (à adapter)
REMOTE_HOST="adresse.ip.de.l.appareil"
REMOTE_USER="utilisateur_ssh"
SOURCE_DIR="/volume1/dossier_a_sauvegarder/"
DEST_DIR="/chemin/distant/de/destination/"
LOG_FILE="/var/log/rsync_sync.log"

# --- Boucle de vérification de l'hôte ---
echo "$(date): Tentative de connexion à $REMOTE_HOST..." >> $LOG_FILE

while ! ping -c 1 -W 1 $REMOTE_HOST > /dev/null 2>&1
do
    echo "$(date): Hôte ($REMOTE_HOST) hors ligne. Attente de 5 minutes..." >> $LOG_FILE
    sleep 300 # Attend 300 secondes (5 minutes) avant de réessayer
done

# --- Exécution de Rsync (une fois l'hôte en ligne) ---
echo "$(date): Hôte en ligne ! Démarrage de la synchronisation rsync." >> $LOG_FILE

# La commande rsync (assurez-vous d'utiliser -e ssh si c'est rsync over ssh)
rsync -avz --delete -e ssh $SOURCE_DIR $REMOTE_USER@$REMOTE_HOST:$DEST_DIR >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
    echo "$(date): Synchronisation rsync terminée avec succès." >> $LOG_FILE
else
    echo "$(date): ERREUR lors de la synchronisation rsync." >> $LOG_FILE
fi