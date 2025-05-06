
const Definition = ({ definitions }) => {
    return (
        <li className="definitions-item">
            {definitions.definition}
        </li>
    );
}

const ClickableWord = ({ word }) => {
    const hasSpace = word.includes(" ") || word.includes("-");
    const titleText = hasSpace ? "" : "Define " + word;

    const handleClick = () => {
        const input = document.getElementById("word");
        input.value = word;
        input.focus();
    }

    return (
        <button
            type="button"
            className="clickable-word"
            onClick={handleClick}
            disabled={hasSpace}
            title={titleText}>
            {word}
        </button>
    );
}

export default function Result({ word, phonetics, meanings }) {
    if (!word) {
        return null; // Don't render anything if there's no word
    }

    return (
        <div className="result">
            <h2 className="result-word move-in">{word}</h2>
            {phonetics && phonetics.length > 0 && (
                <p><span className="bold move-in">Phonetics:</span> {phonetics.map(phonetic => phonetic.text).join(' | ')}</p>
            )}

            <span className="bold">Meanings</span>

            {meanings && meanings.length > 0 && (
                <ul className="meanings">
                    {meanings.map((meaning, index) => (
                        <li className="meanings-item move-up" key={index}>
                            <span className="bold capitalise">{meaning.partOfSpeech}</span>:
                            <ul className="definitions">

                                {(meaning.definitions ?? []).map((definitions, i) => (
                                    <Definition definitions={definitions} key={i} />
                                ))}

                                {(meaning.synonyms ?? []).length > 0 && (
                                    <p className="synonyms"><span className="bold">Synonyms:</span>
                                        {meaning.synonyms.map((synonym, s) => (
                                            <ClickableWord word={synonym} key={s} />
                                        ))}
                                    </p>
                                )}

                                {(meaning.antonyms ?? []).length > 0 && (
                                    <p className="antonyms"><span className="bold">Antonyms:</span>
                                        {meaning.antonyms.map((antonym, a) => (
                                            <ClickableWord word={antonym} key={a} />
                                        ))}
                                    </p>
                                )}

                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}