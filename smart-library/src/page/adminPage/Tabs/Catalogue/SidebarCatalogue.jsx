import React, { useEffect, useState } from 'react'
import style from './SidebarCatalogue.module.css'
import { HiFilter } from "react-icons/hi";
import { getGenre } from '../../../../services/genreServices'
import { getBranch } from '../../../../services/branchServices'

const SidebarCatalogue = ({ setSelectedBranch, setSelectedGenre, selectedGenre, setSelectDateAcquired }) => {

  const [genreList , setGenreList] = useState([])
  const [branchList, setBranchList] = useState([])
 
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const dataGenre = await getGenre()
            const dataBranch = await getBranch()

            if (dataGenre && dataBranch) {
                setGenreList(dataGenre)
                setBranchList(dataBranch)
            }

        } catch (error) {
            console.log(error)
        }
    }

    fetchData()
  },[])  

  const handleSelectGenre = (data) => {
    if (data === 'all') {
        if (selectedGenre.length === genreList.length) {
            setSelectedGenre([])
        } else {
            setSelectedGenre(genreList.map((genre) => genre.genre_name))
        }
    } else {
        if (selectedGenre.includes(data)) {
            setSelectedGenre((old) => old.filter((genre) => genre !== data))
        } else {
            setSelectedGenre((old) => [...old, data])
        }
    }
  }

  


  return (
    <div className={style.container}>
      <div className='d-flex w-100 mb-2 '>
        <h2>Search Filter <HiFilter/></h2>
      </div>
      
      <div className='d-flex flex-column w-100 gap-2'>
        <label>Branch</label>
        <select onChange={(e) => setSelectedBranch(e.target.value)}>
            <option value='all'>All Branch</option>
            {
                branchList.map((branch, index) => (
                    <option value={branch.branch_name} key={index}>{branch.branch_name}</option>
                ))
            }         
        </select>
      </div>
      <div className='d-flex w-100 flex-column mt-4 align-items-start justify-content-start'>
        <label>Date Acquired</label>
        <div className='d-flex gap-2 w-100 mt-2'>
            <div className='d-flex flex-column w-50'>
                <p>Start</p>
                <input type="date" onChange={(e) => setSelectDateAcquired((oldData) => ({ ...oldData, start: e.target.value }))}/>
            </div>
            <div className='d-flex flex-column w-50'>
                <p>End</p>
                <input type="date" onChange={(e) => setSelectDateAcquired((oldData) => ({ ...oldData, end: e.target.value }))}/>
            </div>
        </div>
      </div>
      <div className='d-flex flex-column mt-4'>
        <label>Genre</label>
        <div className={style.genreListDiv}>
            <div className='d-flex gap-2' style={{ width: '50%', }}>
                <input id={style.checkbox} type="checkbox" onClick={() => handleSelectGenre('all')}/>
                <p>{selectedGenre.length === genreList.length ? 'Unselect all' : 'All'}</p>
            </div>
            {
                genreList.map((data, index) => (
                    <div className='d-flex gap-2' style={{ width: '50%', }} key={index}>
                        <input id={style.checkbox} type="checkbox" checked={selectedGenre.includes(data.genre_name)} onClick={() => handleSelectGenre(data.genre_name)}/>
                        <p>{data.genre_name}</p>
                    </div>
                ))
            }
        </div>
      </div>
      
      
    </div>
  )
}

export default SidebarCatalogue
