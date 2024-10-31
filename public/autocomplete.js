async function fetchItemNames(itemName) {
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; 
    
    if (itemName.length < 1) {
        suggestionsContainer.style.display = 'none'; 
        return;
    }

    try {
        const response = await fetch(`/item/${encodeURIComponent(itemName)}`);
        const items = await response.json();

        
        if (items && items.length > 0) {
            suggestionsContainer.style.display = 'block'; 
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'dropdown-item';
                div.innerHTML = `<img src="${item.itemimg}" alt="${item.itemname}"> ${item.itemname}`; 

                div.addEventListener('click', () => {
                    document.getElementById('itemName').value = item.itemname; 
                    suggestionsContainer.style.display = 'none'; 
                });

                suggestionsContainer.appendChild(div); 
            });
        } else {
            suggestionsContainer.style.display = 'none'; 
        }
    } catch (error) {
        console.error('Error fetching item names:', error);
    }
}