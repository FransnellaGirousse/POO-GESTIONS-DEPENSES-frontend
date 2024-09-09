import React, { useState, useEffect } from 'react';
import './App.css';
import DepenseForm from './components/DepenseForm';
import Dashboard from './components/Dashboard';
import Depense from './models/Depense';
import LoginForm from './components/LoginForm'; 
import * as XLSX from 'xlsx';
import axios from 'axios';

function App() {
  const [depenses, setDepenses] = useState([]);
  const [depensesPlanifiees, setDepensesPlanifiees] = useState([]); // Dépenses planifiées
  const [montantTotal, setMontantTotal] = useState(1000); // Montant total initial par défaut
  const [isAuthenticated, setIsAuthenticated] = useState(false); // État d'authentification

    // Charger le montant initial 
  useEffect(() => {
    const montantSauvegarde = localStorage.getItem('montantTotal');
    if (montantSauvegarde) {
      setMontantTotal(parseFloat(montantSauvegarde));
    }
  }, []);

  // Enregistrer le montant total 
  useEffect(() => {
    localStorage.setItem('montantTotal', montantTotal);
  }, [montantTotal]);

  function getAlldepense(){
    axios.get("http://localhost:8000/api/depense")
    .then((response)=>{
      console.log(response.data);
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  // Fonction de connexion
const handleLogin = (username, password) => {
    const defaultUsername = 'user@example.com';
    const defaultPassword = '12345678';

  // Vérification de l'authentification
if (username === defaultUsername && password === defaultPassword) {
      setIsAuthenticated(true);
      alert('Connexion réussie !');
    } else {
      alert('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Réinitialiser l'état d'authentification
  };

  const ajouterDepense = (description, montant, categorie, date, pieceJointe) => {
    const nouvelleDepense = new Depense(description, montant, categorie, date, pieceJointe);

  // Vérifier si le montant de la dépense dépasse le montant restant
if (montant > montantTotal) {
      alert('Montant insuffisant !');
      return;
    }

    setDepenses([...depenses, nouvelleDepense]);
    setMontantTotal(montantTotal - montant); 
  };

// Ajouter une dépense planifiée 
const ajouterDepensePlanifiee = (description, montant, categorie, date, pieceJointe) => {
    const nouvelleDepense = new Depense(description, montant, categorie, date, pieceJointe);
    setDepensesPlanifiees([...depensesPlanifiees, nouvelleDepense]);
  };

// Fonction pour générer un fichier Excel et le télécharger
const telechargerDepensesExcel = () => {
    const data = depenses.map(depense => ({
      Description: depense.description,
      Montant: depense.montant,
      Catégorie: depense.categorie,
      Date: depense.date
    }));

        // Créer une feuille de calcul à partir des données
const worksheet = XLSX.utils.json_to_sheet(data);
        // Créer un classeur (workbook)
const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dépenses');

        // Générer et télécharger le fichier Excel
XLSX.writeFile(workbook, 'depenses.xlsx');
  };

    // Fonction pour ajuster le montant total
const ajusterMontant = (montant, action) => {
    if (action === 'ajouter') {
      setMontantTotal(montantTotal + parseFloat(montant));
    } else if (action === 'retirer') {
      if (parseFloat(montant) > montantTotal) {
        alert("Vous ne pouvez pas retirer plus que le montant restant !");
        return;
      }
      setMontantTotal(montantTotal - parseFloat(montant));
    }
  };

    // Fonction pour transférer une dépense planifiée aux dépenses actuelles (lorsqu'elle est confirmée)
const confirmerDepensePlanifiee = (depense) => {
    ajouterDepense(depense.description, depense.montant, depense.categorie, depense.date, depense.pieceJointe);
    setDepensesPlanifiees(depensesPlanifiees.filter(d => d !== depense));
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <h1>Suivi des dépenses personnelles</h1>

      <button onClick={handleLogout} className="logout-button">Déconnexion</button> {/* Bouton de déconnexion en bas à droite */}
 {/* Bouton de déconnexion */}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DepenseForm 
          ajouterDepense={ajouterDepense} 
          ajouterDepensePlanifiee={ajouterDepensePlanifiee} 
          montantRestant={montantTotal} 
        />
        <div className="montant-restant">
          <h2>Montant restant</h2>
          <p>{montantTotal} €</p>
        </div>
      </div>

      <div>
        <h2>Modifier le montant</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const montant = e.target.elements.montant.value;
            const action = e.target.elements.action.value;
            ajusterMontant(montant, action);
            e.target.reset(); 
          }}
        >
          <input type="number" name="montant" placeholder="Montant" required />
          <select name="action">
            <option value="ajouter">Ajouter au montant</option>
            <option value="retirer">Retirer du montant</option>
          </select>
          <button type="submit">Modifier Montant</button>
        </form>
      </div>

      <Dashboard depenses={depenses} />

            {/* Section pour les dépenses planifiées */}
      <div className="depenses-planifiees">
        <h2>Dépenses planifiées</h2>
        <ul>
          {depensesPlanifiees.map((depense, index) => (
            <li key={index}>
              {depense.description} - {depense.montant} € - {depense.categorie} - {depense.date}
              <button onClick={() => confirmerDepensePlanifiee(depense)}>Confirmer</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Ajout du bouton de téléchargement Excel */}
      <button onClick={telechargerDepensesExcel}>Télécharger en Excel</button>
    </div>
  );
}

export default App;
