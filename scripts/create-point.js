function populateUFs() {
    const ufselect = document.querySelector("select[name=uf")
    

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
                          
                        for ( const state of states) {

                            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
                        }

                     }
                
        )
}

populateUFs()

function getCities(event) {            

            const citySelect = document.querySelector("select[name=city]")
            const stateInput = document.querySelector("input[name=state")
                                 
            const ufvalue = event.target.value

            /* As duas linhas buscam o nome do Estado selecionado. Altera o parametro "Value"
               do input antes mesmo do Submit*/
            const indexOfSelectedState = event.target.selectedIndex
            stateInput.value = event.target.options[indexOfSelectedState].text
            

            const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

            citySelect.innerHTML = " "
            citySelect.disabled = true

            fetch(url)
            .then( res => res.json())
            .then( cities => {
                for (const city of cities) {

                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                }

                citySelect.disabled = false

            })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
           

/* Itens de coleta */
// Pegar todos os li´s//

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect) {
        item.addEventListener("click", handleSelectedItem)
}


//--------------------------------------------------------------------------//

// Atualiza o campo Input escondido no html, dentro do fieldset referente aos
//itens de coleta
const collectedItems = document.querySelector("input[name=items]")

// Vertor que recebe  o ID do itens selecionados na tela de cadastro
// de entidade
let selectedItems = []

function handleSelectedItem(event) {
        const itemLi = event.target

        // Adiciona ou remove uma classe com javascript
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id
        //console.log(itemId)

    //console.log(event.target.dataset.id)
    

    //Verificar se o item foi selecionado
    //se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId  //retorna True ou False
        //console.log(item)       
        return itemFound                   
    })   


    //console.log(alreadySelected)
    // Se ja estiver selecionado
    if (alreadySelected >= 0) {
        //Tirar da seleção
        const filteredItems = selectedItems.filter( function(item) {
            const itemIsDifferent = item != itemId  //False
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    //console.log(selectedItems)

    //
    collectedItems.value = selectedItems  


}



