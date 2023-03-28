
const searchFilter = (req, res) => {

    try {
        const { servicesArray, searchString } = req.body
        
        const resultsArray = servicesArray.filter(item => item.serviceName.toLowerCase().includes(searchString))
        if (resultsArray.length === 0) return res.status(200).json({ message: 'no services found!!' })
        res.status(200).json({ message: resultsArray })

    } catch (error) {
        res.status(400).json(({ error: error.message }))

    }
}

module.exports = searchFilter