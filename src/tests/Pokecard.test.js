import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import Pokecard from "../components/Pokecard"
import {pokemonMock} from "./pokemonMock"

jest.mock("axios")

const urlMock = { url: "https://pokeapi.co/api/v2/pokemon/1/" }

const openModalMock = jest.fn()

describe("Pokecard", () => {
    test('renderizar pokecard', async () => {
        axios.get.mockResolvedValueOnce({
            data: pokemonMock
        })

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}
        />)
        screen.debug()
        await waitFor(() => { })
        screen.debug()
        
    })

    test('renderizar pokecard após carregamento', async () => {
        axios.get.mockResolvedValueOnce({
            data: pokemonMock
        })

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}
        />)
        const loading = screen.getByText(/loading\.\.\./i)
        expect(loading).toBeInTheDocument()

        await waitFor(() => {
            const name = screen.getByRole('heading', {
                name: /bulbasaur/i
              })
            const image = screen.getByRole('img', {
                name: /bulbasaur/i
              })
            const type1 = screen.getByText(/grass/i)
            const type2 = screen.getByText(/poison/i)

            expect(name).toBeInTheDocument()
            expect(image).toBeInTheDocument()
            expect(type1).toBeInTheDocument()
            expect(type2).toBeInTheDocument()
        })
        
        //screen.logTestingPlaygroundURL()
    })

    test('ao clicar no card, é disparada a função que habilita o modal', async () => {
        const user = userEvent.setup()

        axios.get.mockResolvedValueOnce({
            data: pokemonMock
        })

        render(<Pokecard
            url={urlMock}
            openModal={openModalMock}
        />)
        
        await waitFor(() => {})

        const openCard = screen.getByRole('article')

        await user.click(openCard)

        expect(openModalMock).toBeCalledTimes(1)
        expect(openModalMock).toReturn()
        
        //screen.logTestingPlaygroundURL()
        
    })
})

