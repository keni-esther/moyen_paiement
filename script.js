     // =============================================
        // SCRIPT DE GALERIE D'IMAGES
        // =============================================
        const imagePrincipale = document.getElementById('image-principale');
        const miniatures = document.querySelectorAll('.image-detail');

        if (imagePrincipale && miniatures.length > 0) {
            miniatures.forEach(miniature => {
                miniature.addEventListener('click', function() {
                    // Change l'image principale
                    imagePrincipale.src = this.src;
                    
                    // Met à jour la bordure de sélection
                    miniatures.forEach(img => {
                        img.classList.remove('border-blue-500', 'border-4');
                        img.classList.add('border-2');
                    });
                    this.classList.remove('border-2');
                    this.classList.add('border-4', 'border-blue-500');
                });
            });
            
            // Sélectionne la première miniature par défaut
            if (miniatures[0]) {
                miniatures[0].classList.remove('border-2');
                miniatures[0].classList.add('border-4', 'border-blue-500');
            }
        }

        // =============================================
        // SCRIPT STRIPE - PAIEMENT PAR CARTE
        // =============================================
        
        // ⚠️ ÉTAPE 1 : Inscrivez-vous sur stripe.com (gratuit)
        // ⚠️ ÉTAPE 2 : Dans votre tableau de bord Stripe, allez dans "Developers" > "API Keys"
        // ⚠️ ÉTAPE 3 : Copiez votre "Publishable key" (commence par pk_live_ ou pk_test_)
        // ⚠️ ÉTAPE 4 : Remplacez la clé ci-dessous par la vôtre
        
        // Initialisation de Stripe (à MODIFIER avec VOTRE clé)
        const stripePublishableKey = 'pk_test_51TBZRjK6ej37xVPyu35wZfqDfJlkYh7T5eJzZUQZXvURBSi7tqwL9lf5l0MznkQzsdsnznZq53eM7ucAze6xBPeg00nLUdLRAW'; // 🔴 REMPLACEZ CETTE LIGNE
        
        // Cache le message d'avertissement si la clé semble valide
        const warningEl = document.getElementById('stripe-config-warning');
        
        // Vérification basique que la clé a été modifiée
        if (stripePublishableKey && stripePublishableKey !== 'pk_test_51TBZRjK6ej37xVPyu35wZfqDfJlkYh7T5eJzZUQZXvURBSi7tqwL9lf5l0MznkQzsdsnznZq53eM7ucAze6xBPeg00nLUdLRAW' && stripePublishableKey.length > 20) {
            if (warningEl) {
                warningEl.style.display = 'none'; // Cache l'avertissement
            }
            
            // Initialiser Stripe avec la vraie clé
            const stripe = Stripe(stripePublishableKey);
            
            // Configuration du paiement
            const boutonStripe = document.getElementById('stripe-button');
            
            if (boutonStripe) {
                boutonStripe.addEventListener('click', function() {
                    // Désactiver le bouton pendant le chargement
                    boutonStripe.disabled = true;
                    boutonStripe.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirection...';
                    
                    // Créer une session de paiement (en conditions réelles, ceci serait fait par votre backend)
                    // Pour ce tutoriel, on utilise une redirection directe vers Stripe Checkout
                    
                    // ⚠️ ÉTAPE 5 : Remplacez l'URL de succès par votre page de remerciement
                    const successUrl = window.location.origin + '/merci.html'; // À modifier
                    const cancelUrl = window.location.href; // Retour à la page actuelle si annulation
                    
                    // Rediriger vers Stripe Checkout (version simplifiée)
                    // NOTE: En production, vous devriez créer une session de paiement via votre backend
                    // Voici un exemple simple qui redirige vers Stripe (nécessite un compte Stripe actif)
                    
                    // Solution simplifiée : lien direct vers Stripe (à adapter selon votre configuration)
                    window.location.href = 'https://buy.stripe.com/test_aFa9AUaZ00L81M1caa2Fa03'; // 🔴 LIEN À PERSONNALISER
                    
                    // Pour une vraie intégration, consultez : https://stripe.com/docs/payments/accept-a-payment
                    
                    // Réactiver le bouton après 3 secondes (au cas où)
                    setTimeout(() => {
                        boutonStripe.disabled = false;
                        boutonStripe.innerHTML = '<i class="fas fa-credit-card"></i> Payer par carte';
                    }, 3000);
                });
            }
        } else {
            console.log('Stripe : clé API non configurée');
            // Afficher un message convivial si la clé n'est pas configurée
            if (warningEl) {
                warningEl.innerHTML = `
                    <i class="fas fa-info-circle"></i>
                    🔧 Pour activer Stripe : 
                    <ol class="list-decimal ml-4 mt-1 text-xs">
                        <li>Créez un compte sur <a href="https://stripe.com" target="_blank" class="underline">stripe.com</a> (gratuit)</li>
                        <li>Dans "Developers" > "API Keys", copiez votre clé publiable</li>
                        <li>Remplacez "pk_test_VOTRE_CLE_STRIPE" dans le code</li>
                    </ol>
                `;
            }
        }

        // Script pour le bouton Add to Cart (animation)
        const addToCartBtn = document.querySelector('.bg-gray-300.py-3.px-6');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check mr-2"></i>Ajouté !';
                this.classList.remove('bg-gray-300', 'hover:bg-gray-800');
                this.classList.add('bg-green-600', 'text-white');
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('bg-green-600', 'text-white');
                    this.classList.add('bg-gray-300', 'hover:bg-gray-800');
                }, 2000);
            });
        }