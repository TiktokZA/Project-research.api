
import db from "../db/DBcon.js";


const scraperObject = {

	url: ['https://scholar.google.com/','https://www.scopus.com/search/form.uri?zone=TopNavBar&origin=AuthorProfile&display=basic#author'],
	async scrapScholar1(browser,keyword){
        let dataresearch=[];
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url[0]}...`);
        console.log(`Professor to ${ keyword}...`);
        await page.goto(this.url[0]);
        await page.type('#gs_hdr_tsi.gs_in_txt.gs_in_ac', keyword);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        /// check location scrap
        if(! await page.$("#gs_res_ccl_mid > div:nth-child(1) > table > tbody > tr > td:nth-child(2) > h4 > a > b")) {
            console.log({ masage : "Download Data Faile!!!" , length: null});
            await dataresearch.push({ professor :keyword ,data :null ,Skill : null});
            await page.close();
        }else{
            await page.click('#gs_res_ccl_mid > div:nth-child(1) > table > tbody > tr > td:nth-child(2) > h4 > a > b');
            console.log("page loaded....");
            // await page.waitForNavigation();
            await page.waitForSelector('button#gsc_bpf_more.gs_btnPD.gs_in_ib.gs_btn_flat.gs_btn_lrge.gs_btn_lsu');
            await page.click('button#gsc_bpf_more.gs_btnPD.gs_in_ib.gs_btn_flat.gs_btn_lrge.gs_btn_lsu');
            await page.waitForTimeout(1000);
            
            const Citationlist =await page.evaluate( async () =>{
                let data =[];
                const elements = await document.querySelectorAll(".gsc_a_c > .gsc_a_ac.gs_ibl");
                for(let el of elements){
                    data.push(await el.textContent);
                }
                return data;
            });
            const  data_skills =await page.evaluate( async () => {
                let data =[];
                const elements =await document.querySelectorAll("#gsc_prf_int > a");
                for( let el of elements){
                    data.push(await el.textContent);
                }
                return data;
            });
            const datalist =[];
            const links =await page.evaluate( async () =>{
                const links= [];
                    const elements = await document.querySelectorAll(".gsc_a_at");
                    for( let el of elements){ 
                        const link = await el.href;
                        console.log(link);
                        links.push(link);
                    }
                return links;
            });
            console.log({ masage : "get link success",length: links.length})
            let n=0;
           
            for ( let link of links){
                
                await page.goto(link)
                const data = await page.evaluate( async () =>{
                    let Title = "" ;
                    let Publication_date = "0000" ;
                    let Conference= "" ;
                    let Description  = "" ;
                    let article = "" ;
                    let type ="";
                    let author=[];
                    try {
                        const elementsf = await document.querySelectorAll(".gsc_oci_field");
                        const elementsv = await document.querySelectorAll(".gsc_oci_value");

                        for(let i=0 ; i < elementsf.length; i++ ){ 
                            if(await elementsf[i].textContent == "ผู้เขียน") author =await elementsv[i].textContent;
                            if(await elementsf[i].textContent == "วันที่เผยแพร่") Publication_date =await elementsv[i].textContent;
                            if(await elementsf[i].textContent == "การประชุม") Conference =await elementsv[i].textContent;
                            if(await elementsf[i].textContent == "คำอธิบาย") Description =await elementsv[i].textContent;
                            if(await elementsf[i].textContent == "ผู้เผยแพร่") type =await elementsv[i].textContent;
                        }
                        Title =await document.querySelector("#gsc_oci_title > a").textContent;
                        article =await document.querySelector("#gsc_oci_title > a").href;
                        author = author.split(", ");
                    } catch (error) {
                        console.log(`this data `+error);
                    }
                    
                    return {
                        Title : Title ? Title: "-",
                        Publication_date : Publication_date,
                        Conference : Conference? Conference: "-",
                        Description :  Description? Description: "-",
                        article : article? article:"-",
                        Type : type ?  type: '-',
                        Citation :'',
                        Author: author,
                    }
                });
                data.Citation = Citationlist[n];
                console.log(`Downloading data ${n+1}......`);
                // console.log(data);
                datalist.push(data);
                n++;
            }
            if(datalist){
                await dataresearch.push({ professor :keyword,data :datalist, Skill : data_skills})
                console.log({ masage : "Download Data Success!!!" , length: datalist.length});
            }
            else{
                await dataresearch.push({ professor : keyword ,data :null,Skill : null});
                console.log({ masage : "Download Data Faile!!!" , length: datalist.length});
            }
            await page.close();
            // console.log({ data : dataresearch , length: datalist.length});
        }
        // await browser.close();
        console.log({ masage : "Download Data for professor Success!!!" , length: dataresearch.length});
        let res;
		await db.query(`SELECT * FROM professor WHERE Keyword = '${dataresearch[0].professor}' ;`
        ,async (error, results, fields)=>{
            if (error) throw error;
            let ID = results[0].ID_professor;
			
			for(let i =0 ;i < dataresearch[0].data.length;i++){
                let date_update = new Date(Date.now());
                let date_public = new Date(dataresearch[0].data[i].Publication_date);
                let id_research;
                const form_data ={
                    name_research:dataresearch[0].data[i].Title,
                    Publication_date : date_public,
                    conference:dataresearch[0].data[i].Conference,
                    Description:dataresearch[0].data[i].Description,
                    Link:dataresearch[0].data[i].article,
                    ID_professor:ID,
                    Publisher:dataresearch[0].data[i].Type,
                    ID_Type:1, 
                    Citation: dataresearch[0].data[i].Citation,
                    Date_Update:date_update,
                }
                await db.query(`SELECT * FROM research WHERE name_research = '${dataresearch[0].data[i].Title}' AND ID_Type = 1;`,
                async (err, res) =>{
                    if (err) throw err;
                    if(res.length == 0 ){
                        await db.query(`INSERT INTO research SET ? ;`,
                        form_data,
                        (err, result)=>{
                            if (err) {
                                console.log(err);
                            }else{
                                res = result;
                                console.log(`Insert data Research No.${i+1} Success!!`);
                                // console.log(result);
                                id_research =result.insertId;
                            }
                        });
                    }else{
                        id_research =res[0].ID_research;
                        await db.query(`UPDATE research SET ? WHERE ID_research = ${res[0].ID_research } `,
                        form_data,
                        (err, result)=>{
                                if (err) {
                                    console.log(err);
                                }else{
                                    res = result;
                                    console.log(`Update data Research No.${i+1} Success!!`);
                                    // console.log(result);
                                }
                        });
                    }
                });

			}
            console.log("Core Skill length => ",dataresearch[0].Skill.length)
			for(let i =0 ;i < dataresearch[0].Skill.length;i++){
                
                await db.query(`SELECT * FROM core_skill WHERE name_coreskill = '${dataresearch[0].Skill[i]}';`,
                async (err, res) =>{
                    if (err) throw err;
                    if(res.length == 0 ){
                        await db.query(`INSERT INTO core_skill (name_coreskill) VALUES ('${dataresearch[0].Skill[i]}');`,
                        async (err, result)=>{
                            if (err) {
                                console.log(err);
                            }else{
                                const skil_id= result.insertId;
                                const sql =`INSERT IGNORE INTO skill (ID_coreskill, ID_professor) VALUES (${skil_id}, ${ID});`;
                                await db.query(sql, (e,r)=>{
                                    if(e) {
                                        console.log(e);
                                    }else{
                                        console.log(`Insert data skill No.${i+1} Success!!`);
                                        // console.log(r);
                                    }
                                });
                                // console.log(`Insert data Core skill ${i}  Success!!`);
                                // console.log(result);
                            }
                        });
                    }else{
                        const skil_id = res[0].ID_coreskill;
                        await db.query(`SELECT * FROM skill WHERE ID_coreskill= ${skil_id} AND ID_professor=  ${ID};`,async (e,r)=>{
                            if(e) throw e;
                            if(r.length == 0){
                                const sql =`INSERT IGNORE INTO skill (ID_coreskill, ID_professor) VALUES (${skil_id}, ${ID});`;
                                await db.query(sql,
                                (err, result)=>{
                                        if (err) {
                                            console.log(err);
                                        }else{
                                            console.log(`Insert data skill No.${i+1} Success!!`);
                                            // console.log(result);
                                        }
                                });
                            }
                        })
                        
                        
                    }
                });

			}

        });
        

	},
    async scrapScopus(browser, keyword){
        let dataresearch=[];
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url[1]}...`);
        console.log(`Professor to ${keyword}...`);
        await page.goto(this.url[1]);
        const nameArray = keyword.split(" ");
        const lastname =nameArray[1];
        const firstname =nameArray[0];
        await page.type('#scopus-author-search-form > div:nth-child(2) > div:nth-child(1) > els-input > div > label > input', lastname);
        page.type('#scopus-author-search-form > div:nth-child(2) > div:nth-child(2) > els-input > div > label > input', firstname);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
    
        if(! await page.$('#resultDataRow1 > td.authorResultsNamesCol.col20 > a')){
            console.log({ masage : "Data for this Professor is not found..." , length: null});
            await dataresearch.push({ professor :keyword ,data :null,  Skill : null});
            await page.close();
        }else{
            await page.click('#resultDataRow1 > td.authorResultsNamesCol.col20 > a');
            console.log("page loaded....");
            // await page.waitForTimeout(1000);
            if(await page.waitForSelector('#pendo-guide-container')){
                await page.click('button#pendo-close-guide-32945519._pendo-close-guide');
            }
            await page.waitForSelector('#documents-panel > div.stack_4b3eb8.verticalSpacer_4b3eb8 > div > div.col-18.article--results > div > els-results-layout > els-paginator > nav > els-select > div > label');
            await page.select('els-results-layout > els-paginator > nav > els-select > div > label > select', "200");
            await page.select('els-results-layout > els-paginator > nav > els-select > div > label > select', "200");
            await page.waitForTimeout(2000);
            let selector = '.collapsible-panel__button.button--link';
            await page.$$eval(selector, anchors => {
                anchors.map(anchor => {
                    if(anchor.textContent == 'Show abstract') {
                        anchor.click();
                        return
                    }
                })
            });
            const reviewElements = await page.$$(".results-list-item");
            console.log("Download length => ",reviewElements.length);
            const data= [];
            for(let i =0;i<reviewElements.length;i++){
                await page.waitForTimeout(1000);
                try {
                     
                const Title = await reviewElements[i].$eval(
                    '.row > .col-19 > .list-title.margin-size-24-t.margin-size-0-b.text-width-32 > h4 > a > span',
                    (v)=> v.textContent
                );
                const Link = await reviewElements[i].$eval(
                    '.row > .col-19 > .list-title.margin-size-24-t.margin-size-0-b.text-width-32 > h4 > a',
                    (v)=> v.href
                );
                const Type = await reviewElements[i].$eval(
                    '.row > .col-19 > span',
                    (v)=> v.textContent
                );
                let Year = await reviewElements[i].$eval(
                    '.row > .col-19 > .text-meta.text-width-34 > span:nth-child(2)',
                    (v)=> v.textContent
                );
                Year = Year.split(",");
                const Conference = await reviewElements[i].$eval(
                    'span.text-bold.text-italic.text-meta',
                    (v)=> v.textContent
                );
                const Abstact = await reviewElements[i].$eval(
                    '.row > .col-19 > .hydrated > section',
                    (v)=> v.textContent
                );
                const Citation = await reviewElements[i].$eval(
                    '.row > div.col-2.padding-size-24-t > div > div > div > div:nth-child(1)',
                    (v) => v.textContent
                );
                
                const form ={
                        Type: Type ? Type:"-",
                        Title :Title? Title: "-",
                        Year: Year[0] ? Year[0]: '-',
                        Conference : Conference ? Conference : "-",
                        Abstact : Abstact ? Abstact : "-",
                        Link: Link ? Link :"-",
                        Citation : Citation ?  Citation : 0,
                };

                console.log(`Downloading data ${i+1}......`);
                // console.log(form)
                await data.push(form);
                } catch (error) {
                     console.log("Leyer Scraping => ", error)   
                }
            }

            await page.click("#scopus-author-profile-page-control-microui__general-information-content > section > div > ul > li:nth-child(5)");
            await page.waitForSelector("#scopus-author-profile-page-control-microui__general-information-content > section > div > ul > li:nth-child(5) > div > div > div > div > div > div");
            const data_skills =await page.evaluate( async () =>{
                const elements = await document.querySelector("#scopus-author-profile-page-control-microui__general-information-content > section > div > ul > li:nth-child(5) > div > div > div > div > div > div > div:nth-child(4) > div > span").textContent;
                const data =elements.split(" • ");
                console.log("data skill =>", elements);
                return data;
            });
            if(data || data_skills){
                await dataresearch.push({ professor : keyword,data :data, Skill : data_skills})
                console.log({ masage : "Download Data Success!!!" , data_length: data.length, skill_length: data_skills.length});
            }
            else{
                await dataresearch.push({ professor : keyword ,data :null,  Skill : null});
                console.log({ masage : "Download Data Faile!!!" , length: data.length});
            }

        }
        // await browser.close();
        console.log({ masage : "Download Data for professor Success!!!" , length: dataresearch[0].data.length ,skill_length:  dataresearch[0].Skill.length});

        let res;
		await db.query(`SELECT * FROM professor WHERE Keyword = '${dataresearch[0].professor}' ;`
        ,async (error, results, fields)=>{
            if (error) throw error;
            let ID = results[0].ID_professor;
			for(let i =0 ;i < dataresearch[0].data.length;i++){
                let dateFormat = new Date(Date.now());
                let date_public = new Date(dataresearch[0].data[i].Year);
                const form_data ={
                    name_research:dataresearch[0].data[i].Title,
                    Publication_date:date_public,
                    conference:dataresearch[0].data[i].Conference,
                    Description:dataresearch[0].data[i].Abstact,
                    Link:dataresearch[0].data[i].Link,
                    ID_professor:ID,
                    Publisher:dataresearch[0].data[i].Type,
                    ID_Type:2, 
                    Citation:dataresearch[0].data[i].Citation,
                    Date_Update:dateFormat,
                }
                await db.query(`SELECT * FROM research WHERE name_research = '${dataresearch[0].data[i].Title}' AND ID_Type = 2;`,
                async (err, res) =>{
                    if (err) throw err;
                    if(res.length == 0 ){
                        await db.query(`INSERT INTO research SET ?;`,
                        form_data,
                        (err, result)=>{
                            if (err) {
                                console.log(err);
                            }else{
                                res = result;
                                console.log(`Insert data Research No.${i+1} Success!!`);
                                console.log(result);
                            }
                        });
                    }else{
                        await db.query(`UPDATE research SET ? WHERE ID_research = ${res[0].ID_research } `,
                        form_data,
                        (err, result)=>{
                                if (err) {
                                    console.log(err);
                                }else{
                                    res = result;
                                    console.log(`Update data Research No.${i+1} Success!!`);
                                    console.log(result);
                                }
                        });
                    }
                })

			}
            console.log("Core Skill length => ",dataresearch[0].Skill.length)
			for(let i =0 ;i < dataresearch[0].Skill.length;i++){
                
                await db.query(`SELECT * FROM core_skill WHERE name_coreskill = '${dataresearch[0].Skill[i]}';`,
                async (err, res) =>{
                    if (err) throw err;
                    if(res.length == 0 ){
                        await db.query(`INSERT INTO core_skill (name_coreskill) VALUES ('${dataresearch[0].Skill[i]}');`,
                        async (err, result)=>{
                            if (err) {
                                console.log(err);
                            }else{
                                const skil_id= result.insertId;
                                const sql =`INSERT IGNORE INTO skill (ID_coreskill, ID_professor) VALUES (${skil_id}, ${ID});`;
                                await db.query(sql, (e,r)=>{
                                    if(e) {
                                        console.log(e);
                                    }else{
                                        console.log(`Insert data skill No.${i+1} Success!!`);
                                        console.log(r);
                                    }
                                });
                                // console.log(`Insert data Core skill ${i}  Success!!`);
                                // console.log(result);
                            }
                        });
                    }else{
                        const skil_id = res[0].ID_coreskill;
                        await db.query(`SELECT * FROM skill WHERE ID_coreskill= ${skil_id} AND ID_professor=  ${ID};`,async (e,r)=>{
                            if(e) throw e;
                            if(r.length == 0){
                                const sql =`INSERT IGNORE INTO skill (ID_coreskill, ID_professor) VALUES (${skil_id}, ${ID});`;
                                await db.query(sql,
                                (err, result)=>{
                                        if (err) {
                                            console.log(err);
                                        }else{
                                            console.log(`Insert data skill No.${i+1} Success!!`);
                                            console.log(result);
                                        }
                                });
                            }
                        });
                    }
                });
			}
        }); 
        
    }

    
}

export default scraperObject;