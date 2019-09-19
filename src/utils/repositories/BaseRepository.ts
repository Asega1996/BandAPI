import { Base } from "../interfaces/Base";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";


export default abstract class BaseRepository<T1 extends Base, T2 extends T1> {

    protected model: Model<T2>;
    protected fields: string[];
  
    constructor(model: Model<T2>, fields: string[] = []) {
        this.model = model;
        this.fields = fields;
    }
  
    public async create(doc: T1): Promise<T2> {
        return this.model.create(doc);
    }
  
    public async createMany(docs: T1[]): Promise<T2[]> {
        return this.model.insertMany(docs);
    }
    
    public remove(id: string): Promise<T2 | null> {
        return new Promise((resolve, reject) => {
            this.retrieveById(id).then(found => {
                console.log('aqui')
            return (found)? this.model.deleteOne(found) : Promise.resolve(null);

            })
            .then(doc => resolve(doc))
            .catch(error => reject(error));
        });
    }
    
    public async retrieveAll( search = {}): Promise<T2[]> {
  

      const query = this.model.find(search);
  
      return query.exec();
    }
    
  
    public async retrieveById(id: string): Promise<T2 | null> {
        const query = this.model.findOne({ _id: new ObjectId(id) });
        if (this.fields.length > 0) {
            query.populate(this.fields);
        }
        return query.exec();
    }
  
    public update(id: string, toUpdate: T1): Promise<T2 | null> {
        return new Promise((resolve, reject) => {
    
            this.retrieveById(id).then(found => {
            if (found) {
                delete found._id;
    
                Object.keys(toUpdate).forEach(key => {
                found[key] = toUpdate[key];
                });
    
                found.updatedAt = new Date();
                return found.save();
    
            } else {
                return Promise.resolve(null);
            }
    
            })
            .then(doc => resolve(doc))
            .catch(error => reject(error));
    
        });
    }
  
    public delete(id: string): Promise<T2 | null> {
        return new Promise((resolve, reject) => {
            this.retrieveById(id).then(found => {
            if (found) {
                found.updatedAt = new Date();
                found.isActive = false;
                return found.save();
            } else {
                return Promise.resolve(null);
            }
    
            })
            .then(doc => resolve(doc))
            .catch(error => reject(error));
        });
    }
  
    public async empty(): Promise<any> {
        return this.model.deleteMany({}).exec();
    }
  
    public async countActive(): Promise<number> {
        return this.model.count({ isActive: true }).exec();
    }
  
}