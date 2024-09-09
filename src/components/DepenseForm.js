import React, { useState } from 'react';
import axios from 'axios';

function DepenseForm({ ajouterDepense, ajouterDepensePlanifiee, montantRestant }) {
  const [description, setDescription] = useState('');
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('Alimentation');
  const [autreCategorie, setAutreCategorie] = useState('');
  const [date, setDate] = useState('');
  const [pieceJointe, setPieceJointe] = useState(null); // Gérer la pièce jointe
  const [isPlanifiee, setIsPlanifiee] = useState(false); // Gérer si la dépense est planifiée

  function createDepense(){
    console.log("OK",  description, montant, categorie, date, );
    let formData = {
      description : description,
      montant : montant,
      date : date,
      categorie : categorie
    }
    axios.post("http://localhost:8000/api/depense", formData)
    .then((response)=>{
      console.log(response.data);
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const categorieFinale = autreCategorie || categorie; 

    // Validation de base pour description, montant, et date
    if (!description || !montant || !date) {
      alert('Veuillez remplir tous les champs nécessaires.');
      return;
    }



    if (isPlanifiee) {
      // Ajouter la dépense en tant que dépense planifiée
      ajouterDepensePlanifiee(description, parseFloat(montant), categorieFinale, date);
    } else {
      // Ajouter la dépense immédiate
      ajouterDepense(description, parseFloat(montant), categorieFinale, date, pieceJointe);
    }

    // Réinitialiser les champs après soumission
    setDescription('');
    setMontant('');
    setCategorie('Alimentation');
    setAutreCategorie('');
    setDate('');
    setPieceJointe(null);
    setIsPlanifiee(false);
  };

  // Fonction pour gérer la pièce jointe
  const handlePieceJointeChange = (e) => {
    setPieceJointe(e.target.files[0]); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Description :</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Montant :</label>
        <input
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Date :</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Catégorie :</label>
        <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="Alimentation">Alimentation</option>
          <option value="Transport">Transport</option>
          <option value="Loisirs">Loisirs</option>
          <option value="Santé">Santé</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      {/* Si l'utilisateur choisit "Autre", un champ de texte apparaît */}
      {categorie === 'Autre' && (
        <div>
          <label>Autre catégorie :</label>
          <input
            type="text"
            value={autreCategorie}
            onChange={(e) => setAutreCategorie(e.target.value)}
            placeholder="Entrez une catégorie"
          />
        </div>
      )}

      <div>
        <label>Pièce jointe (facultatif) :</label>
        <input type="file" onChange={handlePieceJointeChange} />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isPlanifiee}
            onChange={() => setIsPlanifiee(!isPlanifiee)}
          />
          Dépense planifiée ?
        </label>
      </div>

      {/* Afficher une information si la dépense est planifiée */}
      {isPlanifiee && (
        <div>
          <p style={{ color: 'blue' }}>Cette dépense sera ajoutée à la section "Dépenses planifiées".</p>
        </div>
      )}

      <button onClick={createDepense} type="submit">{isPlanifiee ? 'Planifier la dépense' : 'Ajouter la dépense'}</button>

      <div>
        <p>Montant restant : {montantRestant} €</p>
      </div>
    </form>
  );
}

export default DepenseForm;
